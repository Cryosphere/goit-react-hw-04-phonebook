import PropTypes from 'prop-types';
import style from './Filter.module.css'

export const Filter = ({ value, onChange }) => {
    return (
        <label className={style.label}>Find contacts by name
            <input className={style.input}
                type='name'
                value={value}
                onChange={onChange}
            />
        </label>
    );
};

Filter.propTypes = {
    value: PropTypes.string.isRequired,
    onChange: PropTypes.func.isRequired
}