export default function Button({
    name, buttonClass, buttonType, onClick, container, disabled
}) {
    return (
        <>
            <button
                onClick={onClick}
                className={buttonClass}
                type={buttonType}
                disabled={disabled}>
                {container}{name}
            </button>
        </>
    )
}