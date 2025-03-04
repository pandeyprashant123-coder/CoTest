import ast

from cotest_python.models import CodeError
from cotest_python.rules.baserule import BaseRule


class MissingDocstringRule(BaseRule):
    def __init__(self, rule_name: str) -> None:
        super().__init__(rule_name)

    def visit_FunctionDef(self, node: ast.FunctionDef) -> None:
        if not ast.get_docstring(node):
            self.errors.append(
                CodeError(
                    message=f'Function "{node.name}" is missing a docstring',
                    line=node.lineno,
                    endline=node.lineno,
                    severity=1,
                )
            )

    def check(self, tree: ast.AST) -> list[CodeError]:
        self.visit(tree)
        return self.errors
