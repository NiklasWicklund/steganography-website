import LinkCard from '../components/LinkCard'

export default function Home() {
  return (
    <div className='container'>

      <main className='main'>
        <h1 className='title'>
          Steganography
        </h1>

        <p className='description'>
          Get started by embedding text into an image!
        </p>

        <div className='grid'>
          <LinkCard
            href='/embed'
            title='Embed'
            description='Embed message into PNG image and save the result!'
          />
          <LinkCard
            href='/extract'
            title='Extract'
            description='Extract a message from a PNG image.'
          />
        </div>
      </main>
    </div>
  )
}

  