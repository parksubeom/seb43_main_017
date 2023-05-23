import styled from 'styled-components';
import LikeMusic from './LIkeMusic';
import Myplaylist from './Myplaylist';
import ModifyPlaylist from './ModifyPlaylist';
import { modifyDataState, playListModalState } from 'src/recoil/Atoms';
import { useRecoilState } from 'recoil';
import AddMyplaylist from './AddMyplaylist';
import { ImCross } from 'react-icons/im';
import Loding from 'src/pages/Loding';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function Mypage() {
    const token: string | undefined = window.localStorage.getItem('access_token') || undefined;
    const userimg: string | undefined = window.localStorage.getItem('userimg') || undefined;
    const usernickname: string | undefined = window.localStorage.getItem('usernickname') || undefined;
    const useremail: string | undefined = window.localStorage.getItem('useremail') || undefined;
    const memberId = window.localStorage.getItem('memberId');
    const [openPlayList, setOpenPlayList] = useRecoilState<boolean>(playListModalState);
    const [modifyPlaylistState] = useRecoilState(modifyDataState);
    const Navigate = useNavigate();

    const handelWithdrawal = () => {
        const result = confirm('회원탈퇴를 진행할경우 가지고 있던 음원 데이터는 모두 소실합니다. 동의하십니까?');

        if (result) {
            axios
                .delete(`${process.env.REACT_APP_API_URL}/members/${memberId}`, {
                    headers: {
                        Authorization: token,
                    },
                })
                .then(() => {
                    alert('회원탈퇴가 완료되었습니다.');
                    Navigate('/');
                })
                .catch((error) => {
                    console.error(error);
                });
        } else {
            alert('회원탈퇴가 취소되었습니다.');
        }
    };

    return (
        <div>
            <BackgroundCover></BackgroundCover>
            {openPlayList && (
                <PlaylistContainer>
                    <PlaylistModal>
                        <AddMyplaylist />
                        <Exitbox onClick={() => setOpenPlayList(false)}>
                            <ImCross />
                        </Exitbox>
                    </PlaylistModal>
                </PlaylistContainer>
            )}
            <MypageContainer>
                <MypageListContainer>
                    <UserProfile>
                        {token ? (
                            <div>
                                <div className="user-profile">
                                    {userimg ? (
                                        <img src={userimg} alt={usernickname} />
                                    ) : (
                                        <img src="./assets/profile-icon.png" alt="userImg" />
                                    )}
                                </div>

                                <UserContainer>
                                    <div className="user-name">{usernickname}</div>
                                    <div className="user-email">{useremail}</div>
                                    <Withdrawal onClick={handelWithdrawal}>회원탈퇴</Withdrawal>
                                </UserContainer>
                            </div>
                        ) : (
                            <Loding />
                        )}
                    </UserProfile>

                    <MusicInfor>
                        <LeftContainer>
                            <LikeMusic /> {/* like music 파일 */}
                            <Myplaylist /> {/* my playlist 파일 */}
                        </LeftContainer>

                        <RightContainer>{modifyPlaylistState && <ModifyPlaylist />}</RightContainer>
                    </MusicInfor>
                </MypageListContainer>
            </MypageContainer>
        </div>
    );
}

export default Mypage;

const MypageContainer = styled.div`
    width: 100%;
    height: 100vh;
    display: flex;
    align-items: center;
    justify-content: center;
    overflow: auto;
`;
/**2023-05-06 ScaleOver 되는 백그라운드 애니메이션 - 김주비 */
const BackgroundCover = styled.div`
    box-sizing: border-box;
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    min-height: 100vh;
    background: url('./assets/mypage.png');
    filter: blur(5px);
    background-size: cover;
    opacity: 0.2;
    animation: bgScale 30s infinite;
    @keyframes bgScale {
        50% {
            transform: scale(1.3);
        }
    }
`;
const MypageListContainer = styled.div`
    align-items: center;
    z-index: 1;
    /* border: 1px solid red; */
`;
/* 2023.05.06 유저 프로필사진 컴포넌트 - 홍헤란 */
const UserProfile = styled.div`
    display: flex;
    align-items: flex-start;

    div {
        display: flex;
    }

    .user-profile {
        img {
            width: 130px;
            height: 130px;
            border-radius: 50%;
            border: 3px solid linear-gradient(to right, #ff00bf, blue) 1;
        }
    }
    @media screen and (max-width: 1000px) {
        margin-left: 30px;
        margin-top: 600px;
        width: 400px;
    }
`;
/* 2023.05.06 유저의 이름 / 이메일 컴포넌트 구현 - 홍혜란 */
const UserContainer = styled.div`
    align-items: flex-start;
    display: flex;
    flex-direction: column;
    /* align-items: center; */
    justify-content: center;
    font-family: 'Noto Sans KR', sans-serif;

    > * {
        margin: 5px 40px;
    }

    .user-name {
        font-size: 30px;
        font-weight: bold;
        color: hsl(0, 0%, 100%);
    }

    .user-email {
        font-size: 16px;
        color: rgba(255, 255, 255, 0.5);
        font-weight: 300;
    }

    @media screen and (max-width: 1000px) {
        margin-left: 0;
        margin-top: 20px;
    }
`;
const MusicInfor = styled.div`
    position: relative;
    display: flex;
    align-items: center;
    flex-direction: row;
    @media screen and (max-width: 1000px) {
        flex-direction: column;
    }
`;
const LeftContainer = styled.div`
    width: 500px;
    height: 600px;
`;
const RightContainer = styled.div`
    width: 500px;
    height: 600px;
`;
/**2023/05/23 - 플레이리스트 음원 추가 컨테이너 - 박수범 */
const PlaylistContainer = styled.div`
    position: absolute;
    top: 0px;
    width: 100%;
    height: 0vh;
    display: flex;
    flex-direction: column;
    background: rgba(0, 0, 0, 0.5);
    backdrop-filter: blur(10px);
    justify-content: center;
    align-items: center;
    overflow: hidden;
    z-index: 5;
    animation: showModal 1s forwards;

    @keyframes showModal {
        100% {
            height: 100vh;
        }
    }
`;
/**2023/05/23 - 플레이리스트 음원추가 모달창 - 박수범 */
const PlaylistModal = styled.div`
    justify-content: center;
    align-items: center;
    width: 450px;
    height: 600px;
    display: flex;
    flex-direction: column;
    border-radius: 10px;
    @media (max-width: 700px) {
        width: 400px;
        height: 560px;
    }
    > button {
        cursor: pointer;
    }
`;
const Exitbox = styled.div`
    position: absolute;
    bottom: 0px;
    left: 0px;
    display: flex;
    justify-content: center;
    align-items: center;
    bottom: 0px;
    left: 0px;
    width: 60px;
    height: 60px;
    font-size: 10px;
    color: #ccc;
    text-align: center;
    font-size: 2rem;
    border: 2px solid #ccc;

    cursor: pointer;
    z-index: 3;
    :hover {
        color: rgba(199, 68, 68, 1);
        border-color: rgba(199, 68, 68, 1);
    }
`;
const Withdrawal = styled.button`
    width: 80px;
    height: 40px;
    background-color: #ff4848;
    border: none;
    color: #ececec;
    font-family: 'Noto Sans KR', sans-serif;
    border-radius: 5px;
    margin-top: 20px;
    transition: 0.1s ease-in-out;
    :hover {
        background-color: #ff7979;
    }
`;
