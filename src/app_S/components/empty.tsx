import * as React from 'react'

export default function Empty() {

  React.useEffect(() => {


    return () => { // clean-up function
    }
  }, [])

  return (
    <div className='container'>
      <h1 className='heading'>
          Empty Web Page
      </h1>


    </div>
  );

}
