import ast

from cotest_python.constant import FUNCTION_MAX_ARGS
from cotest_python.constant import FUNCTION_MAX_LINES
from cotest_python.constant import FUNCTION_TOTAL_RETURN_COUNT
from cotest_python.models import CodeError
from cotest_python.rules.baserule import BaseRule


class MultipleReturnsRule(BaseRule):
    def __init__(self, rule_name: str) -> None:
        super().__init__(rule_name)

    def visit_FunctionDef(self, node: ast.FunctionDef) -> None:
        return_count = sum(
            1 for n in ast.walk(node) if isinstance(n, ast.Return)
        )
        if return_count > FUNCTION_TOTAL_RETURN_COUNT:
            self.errors.append(
                CodeError(
                    message=f'Function "{node.name}" has multiple return statements',
                    line=node.lineno,
                    endline=node.lineno,
                    severity=1,
                )
            )

    def check(self, tree: ast.AST) -> list[CodeError]:
        self.visit(tree)
        return self.errors
