import ast

from cotest_python.models import CodeError
from cotest_python.rules.baserule import BaseRule


class UnusedVariablesRule(BaseRule):
    def __init__(self, rule_name: str) -> None:
        super().__init__(rule_name)
        self.defined_vars = {}
        self.used_vars = set()

    def visit_Assign(self, node: ast.Assign) -> None:
        for target in node.targets:
            if isinstance(target, ast.Name):
                self.defined_vars[target.id] = target.lineno
        self.generic_visit(node)

    def visit_AugAssign(self, node: ast.AugAssign) -> None:
        if isinstance(node.target, ast.Name):
            self.used_vars.add(node.target.id)
        self.generic_visit(node)

    def visit_For(self, node: ast.For) -> None:
        if isinstance(node.target, ast.Name):
            self.used_vars.add(node.target.id)
        self.generic_visit(node)

    def visit_Name(self, node: ast.Name) -> None:
        if isinstance(node.ctx, ast.Load):
            self.used_vars.add(node.id)

    def check(self, tree: ast.AST) -> list[CodeError]:
        self.visit(tree)
        for name, lineno in self.defined_vars.items():
            if name not in self.used_vars:
                self.errors.append(
                    CodeError(
                        severity=1,
                        message=f'Unused variable: "{name}"',
                        line=lineno,
                        endline=lineno,
                    )
                )
        return self.errors
