import { CloseOutlined } from '@material-ui/icons';
import { memo, useState, useContext } from 'react';
import useForm from '../../utils/useForm';
import { validateUser } from '../../utils/validationRules';
import FormButton from '../FormButton/FormButton';
import { FormInputContainer } from '../FormInputContainer/FormInputContainer';
import { Context } from "../../store";
import classes from './ClientForm.module.scss';
import { updateUser } from '../../requests/UserRequest';

const groupOptions = [
  { label: 'User', value: 'user'},
  { label: 'Marketing', value: 'marketing'},
  { label: 'Admin', value: 'admin'},
  { label: 'Engineering', value: 'engineering'}
];

const featuresOptions = [
  { label: 'Create', value: 'create'},
  { label: 'Edit', value: 'edit'},
  { label: 'Delete', value: 'delete'},
  { label: 'Update', value: 'update'}
];

const statusOptions = [
  { label: 'Inactive', value: false},
  { label: 'Active', value: true}
];

const ClientForm = ({ onClose, userDetails }) => {
  const { dispatch } = useContext(Context);
  const [isLoading, setIsLoading] = useState(false);
  const [featureValue, setFeatureValue] = useState([]);
  const [groupValue,setGroupValue] = useState([]);
  const [stateValue, setStateValue] = useState([{ label: 'Inactive', value: false}])
  const [message, setMessage] = useState(null);

  const onUpdate = async () => {
    setIsLoading(true);
    const payload = {
      ...values,
      features: featureValue,
      groups: groupValue,
      state: Boolean(stateValue)
    };

    try {
      const res = await updateUser(dispatch, userDetails.id, payload);
      setIsLoading(false);
      if(res.status && res.status !== 200) {
        const {data: { message }} = res
        setMessage(message);
      } else {
        setMessage('updated successfully');
      }
    } catch (err) {
      setMessage("something went wrong");
      setIsLoading(false);
    }
  };
  const handleFeatureChange = (e) => {
    setFeatureValue(Array.isArray(e) ? e.map(x => x.value) : []);
  }

  const handleGroupChange = (e) => {
    setGroupValue(Array.isArray(e) ? e.map(x => x.value) : []);
  }

  const handleStateChange = (e) => {
    setStateValue(e);
  }

  const { values, errors, handleChange, handleSubmit } = useForm(
    onUpdate,
    validateUser,
    userDetails
  );

  return (
    <>
      <div className={classes.ClientForm}>
        <span onClick={() => onClose(prev => !prev)} className={classes.ClientForm__closeSpan}>
          <CloseOutlined className={classes.ClientForm__closeIcon} /> Close
        </span>
        <div className={classes.ClientForm__formDiv}>
          <h1 className={classes.ClientForm__titleH1}>update user</h1>
          <form className={classes.ClientForm__form} onSubmit={handleSubmit}>
            <FormInputContainer
              name="name"
              inputName="name"
              inputType="text"
              inputValue={values.name}
              errorName={errors.name}
              placeholderText="Name"
              change={handleChange}
              isRequired={false}
            />
            <FormInputContainer
              inputName="State"
              inputType="select"
              inputValue={stateValue}
              change={handleStateChange}
              isRequired
              selectOptions={statusOptions}
              customInputStyle={{height: '38px'}}
              isClearable
            />
            <FormInputContainer
              inputName="Groups"
              inputType="select"
              inputValue={groupOptions.filter(obj => groupValue.includes(obj.value))}
              change={handleGroupChange}
              isMulti
              isRequired
              selectOptions={groupOptions}
              customInputStyle={{height: '38px'}}
              isClearable
            />
            <FormInputContainer
              inputName="Features"
              inputType="select"
              inputValue={featuresOptions.filter(obj => featureValue.includes(obj.value))}
              change={handleFeatureChange}
              isMulti
              isClearable
              selectOptions={featuresOptions}
              customInputStyle={{
                height: '38px',
                marginBottom: '30px'
              }}
            />
            {message && (
              <div className={classes.ClientForm__message}>
                <p>{message}</p>
              </div>
            )}

            <FormButton
              name="update user"
              isLoading={isLoading}
              buttonColor="#1D3557"
              textColor="#fff"
              loaderColor="#fff"
              loaderType="TailSpin"
              customInputStyle={{ marginBottom: '30px' }}
            />
          </form>
        </div>
      </div>
    </>
  )
}

// value={data.filter(obj => selectedValue.includes(obj.value))}

export default memo(ClientForm);
