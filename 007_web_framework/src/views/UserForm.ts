import { User, UserProps } from '../models/User';
import { View } from './View';

export class UserForm extends View<User, UserProps> {
    eventsMap(): { [key: string]: () => void } {
        return {
            'click:.set-age': this.onSetAgeclick,
            'click:.set-name': this.onSetNameClick,
            'click:.save-model': this.onSaveClick,
        };
    }

    onSetAgeclick = (): void => {
        this.model.setRandomAge();
    };

    onSetNameClick = (): void => {
        const inputEl = this.parent.querySelector('input');

        if (inputEl) {
            const name = inputEl.value;
            this.model.set({ name });
        }
    };

    onSaveClick = (): void => {
        this.model.save();
    };

    template(): string {
        return `
            <div>
                <input placeholder="${this.model.get('name')}" />
                <button class="set-name">Change Name</button>
                <button class="set-age">Set Random Age</button>
                <button class="save-model">Save User</button>
            </div>
        `;
    }
}
