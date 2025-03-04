import argparse
import ast

from cotest_python.calculate_eloc import calculate_eloc
from cotest_python.models import CodeError
from cotest_python.rules.duplicate_dictkeys import DuplicateDictKeysRule
from cotest_python.rules.empty_function import EmptyFunctionRule
from cotest_python.rules.function_missing_docstring import MissingDocstringRule
from cotest_python.rules.function_multiple_returns import MultipleReturnsRule
from cotest_python.rules.function_too_many_args import TooManyArgumentsRule
from cotest_python.rules.long_function import LongFunctionRule
from cotest_python.rules.try_useless_except import UselessTryExceptRule
from cotest_python.rules.unused_import import UnusedImportsRule
from cotest_python.rules.unused_variables import UnusedVariablesRule


class Reviewer:
    def __init__(self) -> None:
        self.rules = [
            UnusedImportsRule(rule_name="Unused import"),
            UnusedVariablesRule(rule_name="Unused variable"),
            DuplicateDictKeysRule(rule_name="Duplicate dictionary keys"),
            UselessTryExceptRule(rule_name="Useless Try Except"),
            MissingDocstringRule(rule_name="Function missing docstring"),
            EmptyFunctionRule(rule_name="Empty function rule"),
            MultipleReturnsRule(rule_name="Function with multiple return"),
            TooManyArgumentsRule(rule_name="Function with too many arguments"),
            LongFunctionRule(rule_name="Long function"),
        ]

    def review(self, source_code: str) -> tuple[list[CodeError], int]:
        errors: list[CodeError] = []
        total_eloc = 0
        try:
            tree = ast.parse(source_code)
            total_eloc = calculate_eloc(tree)
            for rule in self.rules:
                errors.extend(rule.check(tree))
        except SyntaxError as e:
            errors.append(
                CodeError(
                    message=f"Syntax Error : {e.msg}",
                    severity=8,
                    line=e.lineno or 0,
                    endline=e.lineno or 0,
                    column=e.offset or 0,
                )
            )
        return sorted(errors, key=lambda e: e.line), total_eloc


def main():
    parser = argparse.ArgumentParser()
    parser.add_argument("file")
    args = parser.parse_args()

    with open(args.file, "r", encoding="utf-8") as f:
        source_code = f.read()

    reviewer = Reviewer()

    errors, total_eloc = reviewer.review(source_code)

    print(f"Total eloc {total_eloc}")
    if errors:
        for error in errors:
            print(f"Line {error.line}: {error.message}")
    else:
        print("No issues found!")


if __name__ == "__main__":
    main()
