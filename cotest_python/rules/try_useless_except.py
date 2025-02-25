import ast

from cotest_python.models import CodeError
from cotest_python.rules.baserule import BaseRule


class UselessTryExceptRule(BaseRule):
    def __init__(self, rule_name: str) -> None:
        super().__init__(rule_name)

    def visit_Try(self, node: ast.Try) -> None:
        # a handler whose body is just `raise` is considered useless
        def is_handler_useless(handler: ast.ExceptHandler) -> bool:
            if len(handler.body) == 1 and isinstance(
                handler.body[0], ast.Raise
            ):
                raise_argument = handler.body[0].exc
                return raise_argument is None or (
                    isinstance(raise_argument, ast.Name)
                    and raise_argument.id == handler.name
                )
            return False

        if node.handlers and all(
            is_handler_useless(handler) for handler in node.handlers
        ):
            self.errors.append(
                CodeError(
                    severity=1,
                    message="Useless try-except block detected.",
                    line=node.lineno,
                    endline=node.end_lineno or node.lineno,
                )
            )
        self.generic_visit(node)

    def check(self, tree: ast.AST) -> list[CodeError]:
        self.visit(tree)
        return self.errors
