# RichTable


## Example of usage

```
import RichTable from 'rich-table'


const SomeAwesomePage = () => {
    const load = useCallback(() => {
        return Promise.resolve({
            meta: {
                matchedresults: 1000,
            },
            data: [
                {
                    uniqField: '1',
                    field1: 'Field 1 content',
                    field2: 'Field 2 content',
                    field3: 'Field 3 content',
                },
                {
                    uniqField: '2',
                    field1: 'Field 1 content 2',
                    field2: 'Field 2 content 2',
                    field3: 'Field 3 content 2',
                },
            ],
        })
    }, [])

    return (
            <RichTable
                uniqField="uniqField"
                columns={[
                    {
                        id: 'field1',
                        filterField: 'field1',
                        mapHeaderProps: () => {
                            return {
                                children: 'Field 1',
                            }
                        },
                        mapCellProps: 'field1',
                    },
                    {
                        id: 'field2',
                        filterField: 'field2',
                        mapHeaderProps: () => {
                            return {
                                children: 'Field 2',
                            }
                        },
                        mapCellProps: 'field2',
                    },
                    {
                        id: 'field3',
                        filterField: 'field3',
                        mapHeaderProps: () => {
                            return {
                                children: 'Field 3',
                            }
                        },
                        mapCellProps: 'field3',
                    },
                ]}
                load={load}
            />
    )
}
```
