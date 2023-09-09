from functools import reduce
from operator import mul
from typing import TypeVar

T = TypeVar('T')


def multi_field_sort(ids: dict[T, list[int]]) -> list[T]:
    """
    Sorts a list of ids by multiple fields.

    :param ids: dict of { id: [field1, field2, ...] }; this will be modified while sorting.
    """
    num_fields = len(ids[next(iter(ids))])
    for i in range(num_fields):
        sorted_unique_fields = sorted(set(v[i] for v in ids.values()))
        unique_len = len(sorted_unique_fields)
        val_to_idx: dict[int, float] = {}
        for idx, val in enumerate(sorted_unique_fields, 1):
            val_to_idx[val] = idx / unique_len
        for v in ids.values():
            v[i] = val_to_idx[v[i]]
    for v in ids.values():
        v.append(reduce(mul, v))
    return sorted(ids.keys(), key=lambda x: ids[x][num_fields])