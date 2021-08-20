import Sample from '../pages/Sample'
import { render } from './utils'

describe('初期表示の確認', () => {
  test('サンプルページ', () => {
    const { asFragment } = render(<Sample />)
    expect(asFragment()).toMatchSnapshot()
  })
})
