import {
  Button,
  FormControl,
  FormLabel,
  Input,
  Select,
  Stack,
  StackItem,
} from '@chakra-ui/react';
import React, { FormEvent } from 'react';
import { Case, Default, Switch } from 'react-if';
import * as yup from 'yup';

import Error from '../components/Error';

interface IFormProps {
  fields: {
    label: string;
    name: string;
    type: 'text' | 'email' | 'password' | 'number' | 'date' | 'select';
    options?: { title: string; value: string }[];
  }[];
  initialValues?: { [key: string]: any };
  submitButtonText: string;
  validationSchema?: yup.AnyObjectSchema;
  isLoading?: boolean;
  onSubmit: (vals: Record<string, any>) => any;
}

export default function Form(props: IFormProps) {
  const [error, setError] = React.useState('');
  const [formData, setFormData] = React.useState<Record<string, any>>({});

  const onChange = (name: string, value: string | number) => {
    let d = { [name]: value };
    setError('');
    setFormData(() => ({ ...formData, ...d }));
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    setError('');
    try {
      props.validationSchema?.validateSync(formData);
      props.onSubmit(formData);
    } catch (e: any) {
      setError(e.message);
    }
  };
  return (
    <form
      className="flex flex-col"
      style={{ width: '100%' }}
      onSubmit={handleSubmit}
    >
      <Error message={error} />
      <Stack mx="auto" w="min(100%, 700px)" spacing={5}>
        {props.fields.map((f) => (
          <StackItem as={FormControl} key={f.name}>
            <FormLabel>{f.label}</FormLabel>
            <Switch>
              <Case condition={f.type === 'select'}>
                <Select
                  name={f.name}
                  value={
                    formData[f.name] ||
                    (props.initialValues ? props.initialValues[f.name] : '')
                  }
                >
                  {f.options?.map((op) => (
                    <option key={op.title} value={op.value}>
                      {op.title}
                    </option>
                  ))}
                </Select>
              </Case>
              <Default>
                <Input
                  type={f.type}
                  name={f.name}
                  value={
                    formData[f.name] ||
                    (props.initialValues ? props.initialValues[f.name] : '')
                  }
                  onChange={(e) =>
                    onChange(
                      e.target.name,
                      f.type === 'number'
                        ? Number(e.target.value)
                        : e.target.value,
                    )
                  }
                />
              </Default>
            </Switch>
          </StackItem>
        ))}
        <Button
          type="submit"
          variant="solid"
          colorScheme="primary"
          isLoading={props.isLoading}
          mt={5}
        >
          {props.submitButtonText}
        </Button>
      </Stack>
    </form>
  );
}
