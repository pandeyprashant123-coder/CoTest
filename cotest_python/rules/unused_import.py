import ast

from cotest_python.models import CodeError
from cotest_python.rules.baserule import BaseRule


class UnusedImportsRule(BaseRule):
    def __init__(self, rule_name: str) -> None:
        super().__init__(rule_name)
        self.imports = {}
        self.used_names = set()

    def visit_Import(self, node: ast.Import) -> None:
        for alias in node.names:
            import_name = alias.asname if alias.asname else alias.name
            self.imports[import_name] = node.lineno

    def visit_ImportFrom(self, node: ast.ImportFrom) -> None:
        for alias in node.names:
            self.imports[alias.name] = node.lineno

    def visit_Name(self, node: ast.Name) -> None:
        if isinstance(node.ctx, ast.Load):
            self.used_names.add(node.id)

    def check(self, tree: ast.AST) -> list[CodeError]:
        self.visit(tree)
        for name, lineno in self.imports.items():
            if name not in self.used_names:
                self.errors.append(
                    CodeError(
                        message=f'Unused import: "{name}"',
                        line=lineno,
                        endline=lineno,
                        severity=1,
                    )
                )
        return self.errors
