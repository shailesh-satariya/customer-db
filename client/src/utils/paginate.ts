import _ from "lodash";

export function paginate(items: Record<string, any>[], pageNumber: number, pageSize: number): any[] {
    const startIndex = (pageNumber - 1) * pageSize;
    return _(items)
        .slice(startIndex)
        .take(pageSize)
        .value();
}
