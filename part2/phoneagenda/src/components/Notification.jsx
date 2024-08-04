const Notification = ({ message, styleType}) => {
    if (message === null) {
      return null
    }
  
    return (
      <div className={styleType}>
        {message}
      </div>
    )
}

export default Notification