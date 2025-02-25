import argparse
import ast

from cotest_python.models import CodeError
from cotest_python.rules.duplicate_dictkeys import DuplicateDictKeysRule
from cotest_python.rules.try_useless_except import UselessTryExceptRule
from cotest_python.rules.unused_import import UnusedImportsRule
from cotest_python.rules.unused_variables import UnusedVariablesRule


class Reviewer:
    def __init__(self) -> None:
        self.rules = [
            UnusedImportsRule(rule_name="Unused import"),
            UnusedVariablesRule(rule_name="Unused variable"),
            DuplicateDictKeysRule(rule_name="duplicate dictionary keys"),
            UselessTryExceptRule(rule_name="Useless Try Except"),
        ]

    def review(self, source_code: str) -> list[CodeError]:
        tree = ast.parse(source_code)
        errors: list[CodeError] = []
        for rule in self.rules:
            errors.extend(rule.check(tree))
        return sorted(errors, key=lambda e: e.line)


def main():
    parser = argparse.ArgumentParser()
    parser.add_argument("file")
    args = parser.parse_args()

    with open(args.file, "r", encoding="utf-8") as f:
        source_code = f.read()

    reviewer = Reviewer()

    errors = reviewer.review(source_code)

    if errors:
        for error in errors:
            print(f"Line {error.line}: {error.message}")
    else:
        print("No issues found!")


if __name__ == "__main__":
    main()
