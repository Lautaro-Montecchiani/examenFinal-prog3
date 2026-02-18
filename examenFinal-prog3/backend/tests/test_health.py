from fastapi.testclient import TestClient
from app.main import app

client = TestClient(app)


def test_health_check_ok():
    response = client.get("/health_check")
    assert response.status_code == 200
    data = response.json()
    assert data["status"] == "healthy"
    assert "database" in data["checks"]
