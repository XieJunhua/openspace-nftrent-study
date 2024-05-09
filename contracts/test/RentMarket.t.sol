// SPDX-License-Identifier: MIT
pragma solidity ^0.8.13;

import { Test, console2 } from "forge-std/Test.sol";
import { RentMarket } from "../src/RentMarket.sol";
import { IRenftMarket } from "../src/interface/IReentMarket.sol";
import { RenftMarket } from "../src/RentMarkeet1.sol";
import { MessageHashUtils } from "@openzeppelin/contracts/utils/cryptography/MessageHashUtils.sol";
import { EIP712 } from "@openzeppelin/contracts/utils/cryptography/EIP712.sol";

contract RentMarketTest is Test {
  using MessageHashUtils for bytes32;

  //   struct RentoutOrder {
  //     address maker; // 出租方地址
  //     address nft_ca; // NFT合约地址
  //     uint256 token_id; // NFT tokenId
  //     uint256 daily_rent; // 每日租金
  //     uint256 max_rental_duration; // 最大租赁时长
  //     uint256 min_collateral; // 最小抵押
  //     uint256 list_endtime; // 挂单结束时间
  //   }

  RentMarket rentMarket;
  RenftMarket renftMarket;
  address alice;
  uint256 alicePk;

  function setUp() public {
    rentMarket = new RentMarket();
    renftMarket = new RenftMarket();
    (alice, alicePk) = makeAddrAndKey("alice");
  }

  function testborrow() public {
    vm.startPrank(0x251757EFDd8818283ec73A428e5486FB319bFc84);
    vm.chainId(uint256(11_155_111));

    IRenftMarket.RentoutOrder memory order = IRenftMarket.RentoutOrder({
      maker: 0x251757EFDd8818283ec73A428e5486FB319bFc84,
      nft_ca: 0xc44f93209fFAEe57392C0d1e48367B6Cebe42b3C,
      token_id: 1,
      daily_rent: 200000000000000,
      max_rental_duration: 604800,
      min_collateral: 200000000000000,
      list_endtime: 1715840179
    });
    bytes memory sign =
      hex"199b58eeb87b5ef8f9577903f38ca94de95041f8106061593b336467dda662ba41adac0181aecb56dfd81c7830dc044bca917a510f6ea2815d37d8d5f896b95b1b";
    // uint256 cc = rentMarket.getSeporator();
    // console2.log(cc);
    // rentMarket.borrow(order, sign, order.min_collateral);
    renftMarket.borrow(order, sign);
    vm.stopPrank();
  }
}
