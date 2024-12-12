import Image from 'next/image'

type IProps = {
  id: number;
  name: string;
  photoSrc: string
};
  
export default function AlbumImage({id, name, photoSrc} : IProps){
  return(     
    <Image className='border-2 border-white hover:border-yellow-800 hover:cursor-pointer' key={id} alt={name} src={photoSrc} width={150} height={150} style={{
      width: '100%',
      height: '100%',
    }}/>
  )    
};