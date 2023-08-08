import { EthrDID } from 'ethr-did';
import { Resolver } from 'did-resolver'
import { getResolver } from 'ethr-did-resolver'
import { ethers } from 'ethers';
import dotenv from "dotenv";

dotenv.config({
  path: "../.env"
});

let chainNameOrId = 'goerli';
const rpcUrl = process.env.RPC_URL;
const provider = new ethers.InfuraProvider(chainNameOrId, rpcUrl);
const ISSUER_ADDRESS = process.env.ISSUER_ADDRESS;
const ISSUER_PK = process.env.ISSUER_PK;

// Issuer의 DID 필드 생성
const createDID4issuer = async () => {
   // Issuer의 지갑주소는 메타마스크 5번 지갑
  const ISSUER_SIGNER = new ethers.Wallet(ISSUER_PK, provider);
  const ISSUER_DID = new EthrDID({
    identifier: ISSUER_ADDRESS,
    privateKey: ISSUER_PK,
    provider: ISSUER_SIGNER.InfuraProvider, chainNameOrId,
    txSigner: ISSUER_SIGNER,
    alg: "ES256K",
  })
  didResolving(ISSUER_DID)

}

// DID resolver 사용 및 DID Document 생성
const didResolving = async (ISSUER_DID) => {
  const didResolver = new Resolver(getResolver({ rpcUrl, name: "goerli" }));
  const didDocument = (await didResolver.resolve(ISSUER_DID.did)).didDocument
  // console.log(didDocument)

  // JWT로 인코딩, 디코딩, 유효확인 테스트 -> 사용은 안할 듯
  // const tempJwt = await ISSUER_DID.signJWT({hello: 'world'});
  // console.log("TEMP JWT", tempJwt);
  // const decoded = decodeJWT(tempJwt)
  // console.log("DECODED",decoded)
  // try{
  //   const {payload, issuer} = await ISSUER_DID.verifyJWT(tempJwt, didResolver);
  //   console.log("PAYLOAD", payload);
  //   console.log("ISSUER", issuer);
  // }catch(err){
  //   console.log("verifying JWT error: ", err);
  // }
  
  // addDelegate로 일시적 서명 위임
  // web3에다가 provider 주입하고 web3.eth.주소 이런식으로해야 이더리움 네트워크에 트잭 남길 수 있음
  // await ISSUER_DID.addDelegate("0x093018c5F85DeDeC37AbE7ec189C669B1c117245", {expiresIn: 8640000, delegateType: 'sigAuth'})

}

createDID4issuer()

// 유저를 위한 자체적 키페어 생성 및 did 등록
const registerDID4user = () => {
  const keypair = EthrDID.createKeyPair();
  console.log("keypair: ", keypair);
  const ethrDidOnGoerliNamed = new EthrDID({...keypair, chainNameOrId});
  console.log("ethrDidOnGoerliNamed: ", ethrDidOnGoerliNamed)
}

// 미완성
// 외부 메타마스크 모듈 이용하여 did 등록
// const importMetamask2DID = async () => {
//   const accounts = await provider.listAccounts();
// const ethrDid = new EthrDID({identifier: accounts[0], provider, chainNameOrId});
// }