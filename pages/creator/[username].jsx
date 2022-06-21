

const Admin = ({ pageData }) => {
    return(
        <>
            <div>
                {pageData.username}
            </div>
        </>
    )
}


export async function getServerSideProps(context) {
    const response = await fetch('http://localhost:8080/checkToken', {
        headers: {
          authorization: 'Bearer ' + context.req.cookies.token
        }
    });
    var props = {}
    if (response.status === 200) {

      const authData = await response.json()

      if (authData.username === context.params.username) {
        console.log('1')
        props.username = context.params.username
        const userres = await fetch('http://localhost:8080/userdata', {
          method: 'POST',
          body: JSON.stringify({
            username: props.username,
          }),
          headers: {
            'Content-Type': 'application/json'
          }
        })
      if(userres.status === 400) {
        console.log('2')
        return {
          redirect: {
            destination: '/creator',
            permanent: false,
          },
        }
      } else if (userres.status === 200) {
        console.log('3')
        const userdata = await userres.json()
        console.log(userdata.aptid)
      }
      } else {
        return {
          redirect: {
            destination: '/creator',
            permanent: false,
          },
        }
      }

    } else {
      return {
        redirect: {
          destination: '/creator',
          permanent: false,
        },
      }
    }

    return {
      props: {
        pageData: props
      }
    }
}

export default Admin;