import './UIButton.css'
const UIButton = ({ onClick, text, margin, color, type }) => {

    if(!type){
        type = 'button';
    }
    return (
        <>
            <button
                style={{ margin: margin }}
                className={`buttonClassUI ${color == 'red' ? 'btn-red' : null} ${color == 'green' ? 'btn-green' : null} ${color == 'blue' ? 'btn-blue' : null}`}
                type="button"
                onClick={onClick}
                type = {type}
                >
                {text.toUpperCase()}
            </button>
        </>
    );
}

export default UIButton;