import ast

from cotest_python.models import CodeError
from cotest_python.rules.baserule import BaseRule


class EmptyFunctionRule(BaseRule):
    def __init__(self, rule_name: str) -> None:
        super().__init__(rule_name)

    def visit_FunctionDef(self, node: ast.FunctionDef) -> None:
        if not any(
            isinstance(
                n,
                (ast.Return, ast.Expr, ast.Assign, ast.If, ast.For, ast.While),
            )
            for n in node.body
        ):
            self.errors.append(
                CodeError(
                    message=f'Function "{node.name}" is empty',
                    line=node.lineno,
                    endline=node.lineno,
                    severity=1,
                )
            )

    def check(self, tree: ast.AST) -> list[CodeError]:
        self.visit(tree)
        return self.errors
