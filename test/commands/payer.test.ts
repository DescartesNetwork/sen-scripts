import { expect, test } from '@oclif/test'

describe('payer', () => {
  test
    .stdout()
    .command(['payer'])
    .it('runs payer', (ctx) => {
      expect(ctx.stdout).to.contain('Cannot find the config file')
    })

  test
  .stdout()
  .command(['payer', '--name', 'jeff'])
  .it('runs hello --name jeff', ctx => {
    expect(ctx.stdout).to.contain('hello jeff')
  })
})
