import ast
from typing import Union


def count_statements(node: ast.AST) -> int:
    """Recursively count executable statements inside all blocks, avoiding double-counting control structures."""
    if isinstance(
        node,
        (
            ast.If,
            ast.For,
            ast.While,
            ast.Try,
            ast.With,
            ast.FunctionDef,
            ast.ClassDef,
        ),
    ):
        return 1 + sum(
            count_statements(child) for child in ast.iter_child_nodes(node)
        )

    return (
        1
        if isinstance(node, ast.stmt)
        else 0
        + sum(count_statements(child) for child in ast.iter_child_nodes(node))
    )


def calculate_eloc(node: Union[ast.Module, ast.FunctionDef]) -> int:
    """Calculate Effective Lines of Code (ELOC) by counting all executable statements."""
    eloc = 0

    for stmt in node.body:
        if isinstance(stmt, ast.FunctionDef) or isinstance(stmt, ast.ClassDef):
            eloc += 1  # Function definition itself counts as 1 ELOC
            eloc += sum(
                count_statements(child) for child in stmt.body
            )  # Recursively count inside function

    return eloc
