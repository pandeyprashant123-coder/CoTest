import ast
from collections import defaultdict

from cotest_python.models import CodeError
from cotest_python.rules.baserule import BaseRule


class DuplicateDictKeysRule(BaseRule):
    def visit_Dict(self, node: ast.Dict) -> None:
        seen = defaultdict(list)
        for key, value in zip(node.keys, node.values):
            if isinstance(key, ast.Constant):
                metadata = {"lineno": key.lineno, "key": key.value}
                seen[key.value].append(metadata)
            if isinstance(value, ast.Dict):
                self.visit(value)

        for key, metadata in seen.items():
            if len(metadata) > 1:
                lines = ", ".join(str(line["lineno"]) for line in metadata)
                self.errors.append(
                    CodeError(
                        severity=1,
                        message=f'Key "{key}" has been repeated on lines {lines}',
                        line=metadata[0]["lineno"],
                        endline=metadata[0]["lineno"],
                    )
                )

    def check(self, tree: ast.AST) -> list[CodeError]:
        self.visit(tree)
        return self.errors
