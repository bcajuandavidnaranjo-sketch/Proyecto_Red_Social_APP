import ProfileSidebar from "../components/ProfileSidebar";
import Feed from "../components/Feed";
import RightSidebar from "../components/RightSidebar";

export default function HomePage() {
  return (
    <div className="w3-container w3-content" style={{ maxWidth: 1400, marginTop: 80 }}>
      <div className="w3-row">
        <ProfileSidebar />
        <Feed />
        <RightSidebar />
      </div>
    </div>
  );
}
