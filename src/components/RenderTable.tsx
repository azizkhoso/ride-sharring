import {
  Table,
  TableContainer,
  Tbody,
  Td,
  Th,
  Thead,
  Tr,
} from '@chakra-ui/react';

interface ITableProps {
  columns: { key: string; title: string }[];
  rows?: Record<string, any>[];
}

export default function RenderTable(props: ITableProps) {
  return (
    <TableContainer>
      <Table>
        <Thead>
          <Tr>
            {props.columns.map((c) => (
              <Th key={c.key}>{c.title}</Th>
            ))}
          </Tr>
        </Thead>
        <Tbody>
          {props.rows?.map((r, ri) => (
            <Tr key={ri}>
              {props.columns.map((c) => (
                <Td key={c.key}>{r[c.key]}</Td>
              ))}
            </Tr>
          ))}
        </Tbody>
      </Table>
    </TableContainer>
  );
}
