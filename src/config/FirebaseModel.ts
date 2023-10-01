import {
  collection,
  addDoc,
  CollectionReference,
  doc,
  getDoc,
  updateDoc,
  deleteDoc,
  query,
  where,
  getDocs,
} from 'firebase/firestore';
import * as yup from 'yup';

import { db } from './firebase';

interface IContraints {
  unique?: string;
  references?: string[][];
}

const constraintSchema = yup.object({
  unique: yup.string(),
  references: yup
    .array()
    .of(
      yup
        .array()
        .of(
          yup
            .mixed()
            .oneOf([yup.string().required(), yup.string().required()])
            .required(),
        ),
    ),
});

export default class FirebaseModel {
  private schema: yup.AnyObjectSchema;
  private collection: CollectionReference;
  private constraints: IContraints = {};

  constructor(
    collectionName: string,
    schema: yup.AnyObjectSchema,
    constraints?: IContraints,
  ) {
    this.schema = schema;
    this.collection = collection(db, collectionName);
    if (constraints) {
      this.constraints = constraintSchema.validateSync(
        constraints,
      ) as IContraints;
    }
  }

  findById = async (id: string): Promise<Record<string, any> | undefined> => {
    try {
      const d = await getDoc(doc(this.collection, id));
      if (d.exists()) {
        return { id: d.id, ...d.data() };
      } else return undefined;
    } catch (error: any) {
      if (typeof error === 'object') throw error?.message;
      else if (typeof error === 'string') throw error;
      else throw JSON.stringify(error || {});
    }
  };

  find = async (options: {
    key: string;
    value: any;
  }): Promise<Record<string, any>[]> => {
    try {
      console.log({ options });
      const q = query(this.collection, where(options.key, '==', options.value));
      const querySnapshot = await getDocs(q);
      const docs: any[] = [];
      querySnapshot.forEach((snapshot) =>
        docs.push({ id: snapshot.id, ...snapshot.data() }),
      );
      return docs;
    } catch (error: any) {
      console.log(error);
      if (typeof error === 'object') throw error?.message;
      else if (typeof error === 'string') throw error;
      else throw JSON.stringify(error || {});
    }
  };

  create = (data: Record<string, any>): Promise<string> =>
    new Promise((res, rej) => {
      console.log('before constraints check');

      if (this.constraints.unique) {
        this.find({
          key: this.constraints.unique,
          value: data[this.constraints.unique],
        }).then((foundDocs) => {
          if (foundDocs.length > 1)
            rej(`Unique constraint ${this.constraints.unique} is violated.`);
          else {
            try {
              this.schema.validateSync(data, { abortEarly: true });
              addDoc(this.collection, data)
                .then((newDoc) => res(newDoc.id))
                .catch(rej);
            } catch (e: any) {
              rej(e.message);
            }
          }
        });
      }
    });

  update = async (id: string, data: any): Promise<Record<string, any>> => {
    try {
      const validated = this.schema.validateSync(data, { abortEarly: true });
      await updateDoc(doc(this.collection, id), validated);
      return validated;
    } catch (error: any) {
      if (typeof error === 'object') throw error?.message;
      else if (typeof error === 'string') throw error;
      else throw JSON.stringify(error || {});
    }
  };

  delete = async (id: string): Promise<string> => {
    await deleteDoc(doc(this.collection, id));
    return id;
  };
}
