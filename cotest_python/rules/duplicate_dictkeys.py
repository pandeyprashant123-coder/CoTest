import ast
from collections import defaultdict

from cotest_python.models import CodeError
from cotest_python.rules.baserule import BaseRule


class DuplicateDictKeysRule(BaseRule):

    def visit_Dict(self, node: ast.Dict) -> None:
        seen = defaultdict(list)

        def get_key_repr(key):
            if isinstance(key, ast.Constant):
                return key.value
            elif isinstance(key, ast.Name):
                return key.id
            elif isinstance(key, ast.Attribute):
                return f"{get_key_repr(key.value)}.{key.attr}"
            elif isinstance(key, ast.Tuple):
                return tuple(get_key_repr(elt) for elt in key.elts)

        for key, value in zip(node.keys, node.values):
            if isinstance(value, ast.Dict):
                self.visit(value)

            key_repr = get_key_repr(key)
            if key_repr and key:
                metadata = {"lineno": key.lineno, "key": key_repr}
                seen[key_repr].append(metadata)

        for key, metadata in seen.items():
            if len(metadata) > 1:
                lines = ", ".join(str(line["lineno"]) for line in metadata)
                self.errors.append(
                    CodeError(
                        severity=2,
                        message=f'Key "{key}" has been repeated on lines {lines}',
                        line=metadata[0]["lineno"],
                        endline=metadata[0]["lineno"],
                    )
                )

    def check(self, tree: ast.AST) -> list[CodeError]:
        self.visit(tree)
        return self.errors
