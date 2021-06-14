import React,{useState} from 'react';
const Form = () => {
   const [date, setdate] = useState()
   const [text, settext] = useState()

   const [image, setImage] = useState({ preview: "", raw: "" });
   const handleChange = e => {
    if (e.target.files.length) {
      setImage({
        preview: URL.createObjectURL(e.target.files[0]),
        raw: e.target.files[0]
      });
    }
  };

  const handleUpload = async e => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("image", image.raw);

    await fetch("YOUR_URL", {
      method: "POST",
      headers: {
        "Content-Type": "multipart/form-data"
      },
      body: formData
    });
  };

function handleSubmit(e){
 e.preventDefault() // stops default reloading behaviour
   console.log(date);
}
    return (
       <div  className="main" onSubmit={handleSubmit}>
           <form className='form'>
               <div className="date">
                    <label className=''>Date</label>
                    <br/>
                    <input type='date' value={date} required onChange={(nam)=>setdate(nam.target.value)} ></input>
                </div>
                <div className='text'>
                    <textarea placeholder="write something here" className="textbox" value={text} required
                    onChange={(nam)=>settext(nam.target.value)}style={{height:'250px', width:'400px'}}>
                    </textarea>
                </div>
                
      <label htmlFor="upload-button">
        {image.preview ? (
          <img src={image.preview} alt="dummy" width="300" height="300" />
        ) : (
          <>
            
            <h5 className="text-center">Select file</h5>
          </>
        )}
      </label>
      <input
        type="file"
        id="upload-button"
        style={{ display: "none" }}
        onChange={handleChange}
      />
      <button onClick={handleUpload}>Upload</button>
           </form>
       </div>
    )
}
export default Form;