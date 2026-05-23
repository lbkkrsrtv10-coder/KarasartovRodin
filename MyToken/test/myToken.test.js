const MyToken = artifacts.require("MyToken");

contract('MyToken', (accounts) => {
  it('should put 1,000,000,000 MyToken in the first account', async () => {
    const instance = await MyToken.deployed();
    const totalSupply = await instance.totalSupply();
    const balance = await instance.balanceOf(accounts[0]);
    
    assert.equal(balance.toString(), totalSupply.toString(), "Balance doesn't match total supply!");
  });

  it('should transfer tokens correctly', async () => {
    const instance = await MyToken.deployed();
    const receiver = accounts[1];
    const sender = accounts[0];
    const amount = 100;

    const senderBalanceBefore = await instance.balanceOf(sender);
    const receiverBalanceBefore = await instance.balanceOf(receiver);

    await instance.transfer(receiver, amount, { from: sender });

    const senderBalanceAfter = await instance.balanceOf(sender);
    const receiverBalanceAfter = await instance.balanceOf(receiver);

    assert.equal(senderBalanceBefore - amount, senderBalanceAfter, "Sender balance incorrect");
    assert.equal(Number(receiverBalanceBefore) + amount, receiverBalanceAfter, "Receiver balance incorrect");
  });
});