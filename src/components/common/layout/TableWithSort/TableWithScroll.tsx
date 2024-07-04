import React from 'react'
import { Table } from '@mantine/core';
const TableWithScroll = ({ elements }: { elements: any }) => {
    console.log(elements)
    const rows =
        elements &&
        elements.results &&
	    elements.results.map((element:any) => (
            <Table.Tr key={element.name}>
                <Table.Td>{element.type}</Table.Td>
                <Table.Td>{element.tire_count}</Table.Td>
                <Table.Td>{element.wash_count}</Table.Td>
                <Table.Td>{element.total_count}</Table.Td>
            </Table.Tr>
        ))

    return (
        <Table.ScrollContainer mah={500} minWidth={"100%"} type='native' className={'col-span-full'}>
            <Table stickyHeader stickyHeaderOffset={0}>
                <Table.Thead>
                    <Table.Tr>
                        <Table.Th>Element position</Table.Th>
                        <Table.Th>Element name</Table.Th>
                        <Table.Th>Symbol</Table.Th>
                        <Table.Th>Atomic mass</Table.Th>
                    </Table.Tr>
                </Table.Thead>
                <Table.Tbody>{rows}</Table.Tbody>
            </Table>
        </Table.ScrollContainer>
    )
}
export default TableWithScroll
