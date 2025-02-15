import ast

from cotest_python.models import CodeError


class BaseRule(ast.NodeVisitor):
    def __init__(self, rule_name: str) -> None:
        self.errors: list[CodeError] = []
        self.rule_name: str = rule_name
