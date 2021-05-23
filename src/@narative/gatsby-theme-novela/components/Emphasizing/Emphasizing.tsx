import styled from "@emotion/styled";
import mediaqueries from "@styles/media";


const Emphasizing = styled.div`
  line-height: 1.756;
  font-size: 18px;
  color: ${p => p.theme.colors.articleText};
  font-family: ${p => p.theme.fonts.sansSerif};
  transition: ${p => p.theme.colorModeTransition};
  margin: 0px auto 35px;
  padding: 15px 20px;
  width: 100%;
  max-width: 680px;
  border-radius: 5px;
  background-color: #fff59e45;

  b {
    font-weight: 800;
  }

  ${mediaqueries.desktop`
    max-width: 507px;
  `}

  ${mediaqueries.tablet`
    max-width: 486px;
    margin: 0 auto 25px;
  `};

  ${mediaqueries.phablet`
    padding: 0 20px;
  `};


`;

export default Emphasizing;