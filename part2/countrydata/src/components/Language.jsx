const Languages = ({languages}) => {
    return (
      <div> 
        <b>languages</b>
        <ul>
          {
            Object.values(languages).map((language) =>
              <li key={language}>{language}</li>
            )
          }
        </ul>
      </div>
    )
}

export default Languages