interface IProps {
  body: string;
  setBody: React.Dispatch<React.SetStateAction<string>>;
  handleSubmit: () => void;
}

const InputComment = ({ body, handleSubmit, setBody }: IProps) => {
  return (
    <div className="fixed -bottom-4 left-1/2 transform -translate-x-1/2  w-full h-20 px-4 max-w-lg ">
      <form onSubmit={(e) => e.preventDefault()} className="relative flex items-center justify-start">
        <input
          value={body}
          onChange={(e) => setBody(e.target.value)}
          type="text"
          placeholder="Tulis Komentar..."
          className="shadow-md flex pr-10 h-12 rounded-2xl pl-4  py-1 text-sm bg-white  transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium focus-visible:ring-1 
          focus-visible:ring-ring placeholder:text-muted-foreground focus-visible:outline-none disabled:cursor-not-allowed disabled:opacity-50"
        />
        <button type="submit" onClick={() => handleSubmit()}>
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6 -ml-10 text-primary">
            <path d="M3.478 2.405a.75.75 0 00-.926.94l2.432 7.905H13.5a.75.75 0 010 1.5H4.984l-2.432 7.905a.75.75 0 00.926.94 60.519 60.519 0 0018.445-8.986.75.75 0 000-1.218A60.517 60.517 0 003.478 2.405z" />
          </svg>
        </button>
      </form>
    </div>
  );
};

export default InputComment;
