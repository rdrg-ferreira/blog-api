import "../styles/FormInput.css";
import "../styles/globalStyle.css";

export default function FormInput({ type, id, labelName, errorMsg }) {
    if (type !== "textarea") {
        return (
            <div className="input flex flex-column">
                <label htmlFor={id}>{labelName}</label>
                <input type={type} id={id} name={id} />
                <p className="field-error">{errorMsg ?? ""}</p>
            </div>
        );
    } else {
        return (
            <div className="input flex flex-column">
                <label htmlFor={id}>{labelName}</label>
                <textarea id={id} name={id} />
                <p className="field-error">{errorMsg ?? ""}</p>
            </div>
        );
    }
}