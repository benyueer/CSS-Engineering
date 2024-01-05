import {Block, Elem} from './bem'

function App() {

  return (
    <div>
      <Block
        name="hello"
        mod={{status: 'primary'}}
        mix="mix_name"
      >
        <Elem
          name="world"
          tag="span"
          mod={{has: 'true'}}
          mix="mix_elem_name"
        >good</Elem>
      </Block>
    </div>
  )
}

export default App
