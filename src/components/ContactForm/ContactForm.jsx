import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { nanoid } from 'nanoid';
import style from './ContactForm.module.css';

const INITIAL_STATE = {
    name: '',
    number: ''
};

export class ContactForm extends Component {
    constructor(props) {
        super(props);
        this.nameId = nanoid();
        this.numberId = nanoid();
    }

    state = { ...INITIAL_STATE };

    handleChange = e => {
        const { name, value } = e.target;
        this.setState({ [name]: value });
    };

    handleSubmit = e => {
        e.preventDefault();
        this.props.onSubmit({ ...this.state, id:nanoid() });
        this.reset();
    };

    reset = () => this.setState({ ...INITIAL_STATE });

    render() {
        return (
            <form className={style.form} onSubmit={this.handleSubmit}>
                <label htmlFor={this.nameId}>Name</label>
                <input className={style.input}
                    id={this.nameId}
                    onChange={this.handleChange}
                    value={this.state.name}
                    type="text"
                    name="name"
                    pattern="^[a-zA-Zа-яА-Я]+(([' -][a-zA-Zа-яА-Я ])?[a-zA-Zа-яА-Я]*)*$"
                    title="Phone number must be digits and can contain spaces, dashes, parentheses and can start with +"
                    required
                />
                <label htmlFor={this.numberId}>Phone</label>
                <input className={style.input}
                    id={this.numberId}
                    type="tel"
                    name="number"
                    value={this.state.number}
                    onChange={this.handleChange}
                    pattern="\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}"
                    title="Phone number must be digits and can contain spaces, dashes, parentheses and can start with +"
                    required
                />
                <button className={style.btn} type="submit">Add contact</button>
            </form>
        );
    }
}

ContactForm.propTypes = {
    onSubmit:PropTypes.func.isRequired,
};
