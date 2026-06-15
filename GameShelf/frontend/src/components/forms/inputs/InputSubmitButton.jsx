const InputSubmitButton = ({ label, disabled }) => (
    <button
        type="submit"
        disabled={disabled}
        className="w-full py-2.5 rounded-xl bg-violet-600 hover:bg-violet-500
                   disabled:bg-violet-900 disabled:text-violet-600
                   text-white font-bold text-[14px] transition-colors
                   cursor-pointer disabled:cursor-not-allowed"
    >
        {label}
    </button>
);
export default InputSubmitButton;