

interface MessageProps{
  text: string
}

const Message: React.FC<MessageProps> = ({text}) => {

  return (
    < >
      <div
      className="flex text-lg font-bold bg-[var(--lauren)] text-[#555 rounded=lg p-8 w-full]"
      >{text}</div>
    </>
  )
}

export default Message