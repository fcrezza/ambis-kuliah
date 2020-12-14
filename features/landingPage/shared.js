import styled from 'styled-components';

const Link = styled.a`
  text-decoration: none;
  display: inline-block;
`;

const LinkImage = styled.img`
  display: block;
  width: 250px;

  @media screen and (max-width: 1024px) {
    width: 230px;
  }

  @media screen and (max-width: 480px) {
    width: 200px;
  }
`;

export function AuthLink() {
  return (
    <Link href="#authGoogle">
      <LinkImage
        src="/images/btn_google_signin_dark_normal_web@2x.png"
        alt="login menggunakan google"
      />
    </Link>
  );
}
