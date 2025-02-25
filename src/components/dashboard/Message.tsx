interface MessageProps{
  text: string
}

const Message: React.FC<MessageProps> = ({text}) => {

  return (
    < >
      <div
      className="flex text-lg text-center font-bold bg-[var(--lauren)] text-[#555] rounded-xl p-8  border-2 border-[#555]"
      >{text}</div>
    </>
  )
}

export default Message

