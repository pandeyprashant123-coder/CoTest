import ast

from cotest_python.models import CodeError
from cotest_python.rules.duplicate_dictkeys import DuplicateDictKeysRule
from cotest_python.rules.unused_import import UnusedImportsRule
from cotest_python.rules.unused_variables import UnusedVariablesRule


class Reviewer:
    def __init__(self) -> None:
        self.rules = [
            UnusedImportsRule(rule_name="unused_import"),
            UnusedVariablesRule(rule_name="unused_variable"),
            DuplicateDictKeysRule(rule_name="duplicate_dict_keys"),
        ]

    def review(self, source_code: str) -> list[CodeError]:
        tree = ast.parse(source_code)
        errors: list[CodeError] = []
        for rule in self.rules:
            errors.extend(rule.check(tree))
        return sorted(errors, key=lambda e: e.line)
