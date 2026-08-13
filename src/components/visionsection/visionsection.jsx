import "./visionsection.css";

function VisionSection() {
  return (
    <section className="vision-section">

      <div className="section-title">
        <h5>OUR FOUNDATION</h5>
    
        <p>
          To unite media presenters in Uganda, promote professionalism, uphold ethical standards, 
          and strengthen the media industry through collaboration, training and advocacy.
        </p>
      </div>

      <div className="vision-cards">

        <div className="vision-card">
          <i className="fi fi-rr-star icon"></i>

          <div>
            <h3>Our Motto</h3>

            <p className="motto-text">
              "One Voice One Vision"
            </p>
          </div>
        </div>

        <div className="vision-card">
          <i className="fi fi-rr-flag icon"></i>

          <div>
            <h3>Our Goal</h3>

            <p>
              To strengthen and promote the welfare, professionalism, unity and socio-economic development of media presenters and broadcasters in Uganda.
            </p>
          </div>
        </div>

        <div className="vision-card">
          <i className="fi fi-rr-eye icon"></i>

          <div>
            <h3>Vision</h3>

            <p>
              To be the leading professional association that unites and
              empowers media presenters in Uganda.
            </p>
          </div>
        </div>

        <div className="vision-card">
          <i className="fi fi-rr-bullseye icon"></i>

          <div>
            <h3>Mission</h3>

            <p>
              To promote professionalism, ethical conduct, capacity building,
              collaboration and innovation within Uganda's media industry.
            </p>
          </div>
        </div>

        <div className="vision-card">
          <i className="fi fi-rr-check-circle icon"></i>

          <div>
            <h3>Objectives</h3>

            <ul>
              <li>Promote professionalism and ethical conduct.</li>
              <li>Provide training and capacity building.</li>
              <li>Advocate and create networking opportunities.</li>
            </ul>
          </div>
        </div>

      </div>

    </section>
  );
}

export default VisionSection;