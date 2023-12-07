import { action, makeObservable, observable, reaction } from 'mobx';
import { ReactNode } from 'react';
import userStore from "./userStore";

export class CatalogStore {

	constructor() {
		makeObservable(this, {

		});

	}


}
const catalogStore = new CatalogStore()

export default catalogStore;
