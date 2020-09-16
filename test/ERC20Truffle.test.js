const { expectThrow } = require("../helpers/expectThrow");
const { EVMRevert } = require("../helpers/EVMRevert");
const ERC20Truffle = artifacts.require("ERC20Truffle");
const BigNumber = web3.BigNumber;
require("chai")
.use(require("chai-bignumber")(BigNumber))
.should();
contract("ERC20Truffle", function([_, owner, investor]) {
    let token;
    const _name = "ERC20Truffle";
    const _symbol = "ERCT";
    const _decimals = 18;
    const _total_supply = new BigNumber(1000000);
    const _over_total_supply = new BigNumber(1100000000000000000000000);
    beforeEach(async function() {
        token = await ERC20Truffle.new(_name, _symbol, _decimals, _total_supply, {
            from: owner
        });
    });
    it("has a name", async function() {
        (await token.name()).should.eq(_name);
    });
    it("has a symbol", async function() {
        (await token.symbol()).should.eq(_symbol);
    });
    it("has 18 decimals", async function() {
        (await token.decimals()).should.be.bignumber.equal(_decimals);
    });
    it(
        "has " + String(1000000000000000000000000) + " total supply",
        async function() {
            (await token.totalSupply()).should.be.bignumber.equal(1000000000000000000000000);
        }
    );
    it("assigns the initial total supply to the creator", async function() {
        const totalSupply = await token.totalSupply();
        const ownerBalance = await token.balanceOf(owner);
        ownerBalance.should.be.bignumber.equal(totalSupply);
    });
    it("transfer token to the investor", async function() {
        await token.transfer(investor, 1000, { from: owner });
        const investorBalance = await token.balanceOf(investor);
        investorBalance.should.be.bignumber.equal(1000);
    });
    it("transfer token to the investor", async function() {
        await token.transfer(investor, 1000, { from: owner });
        const investorBalance = await token.balanceOf(investor);
        investorBalance.should.be.bignumber.equal(1000);
    });
    it("should reject transfer token(more than has) to the investor", async function() {
        await expectThrow(
            token.transfer(investor, _over_total_supply, { from: owner }),
            EVMRevert
        );
    });
});