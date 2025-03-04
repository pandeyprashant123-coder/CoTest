import ast

from cotest_python.constant import FUNCTION_MAX_ARGS
from cotest_python.models import CodeError
from cotest_python.rules.baserule import BaseRule


class TooManyArgumentsRule(BaseRule):
    def __init__(self, rule_name: str) -> None:
        super().__init__(rule_name)

    def visit_FunctionDef(self, node: ast.FunctionDef) -> None:
        if len(node.args.args) > FUNCTION_MAX_ARGS:
            self.errors.append(
                CodeError(
                    message=f'Function "{node.name}" has too many arguments ({len(node.args.args)})',
                    line=node.lineno,
                    endline=node.lineno,
                    severity=1,
                )
            )

    def check(self, tree: ast.AST) -> list[CodeError]:
        self.visit(tree)
        return self.errors
