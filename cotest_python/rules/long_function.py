import ast

from cotest_python.constant import FUNCTION_MAX_LINES
from cotest_python.models import CodeError
from cotest_python.rules.baserule import BaseRule


class LongFunctionRule(BaseRule):
    def __init__(self, rule_name: str) -> None:
        super().__init__(rule_name)

    def visit_FunctionDef(self, node: ast.FunctionDef) -> None:
        start_line = node.lineno
        end_line = (
            node.end_lineno if hasattr(node, "end_lineno") else start_line
        ) or start_line
        if (end_line - start_line + 1) > FUNCTION_MAX_LINES:
            self.errors.append(
                CodeError(
                    message=f'Function "{node.name}" exceeds {FUNCTION_MAX_LINES} lines',
                    line=start_line,
                    endline=end_line,
                    severity=1,
                )
            )

    def check(self, tree: ast.AST) -> list[CodeError]:
        self.visit(tree)
        return self.errors
