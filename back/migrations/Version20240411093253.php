<?php

declare(strict_types=1);

namespace DoctrineMigrations;

use Doctrine\DBAL\Schema\Schema;
use Doctrine\Migrations\AbstractMigration;

/**
 * Auto-generated Migration: Please modify to your needs!
 */
final class Version20240411093253 extends AbstractMigration
{
    public function getDescription(): string
    {
        return '';
    }

    public function up(Schema $schema): void
    {
        // this up() migration is auto-generated, please modify it to your needs
        $this->addSql('ALTER TABLE variable ADD step_id UUID NOT NULL');
        $this->addSql('COMMENT ON COLUMN variable.step_id IS \'(DC2Type:uuid)\'');
        $this->addSql('ALTER TABLE variable ADD CONSTRAINT FK_CC4D878D73B21E9C FOREIGN KEY (step_id) REFERENCES step (id) ON DELETE CASCADE NOT DEFERRABLE INITIALLY IMMEDIATE');
        $this->addSql('CREATE INDEX IDX_CC4D878D73B21E9C ON variable (step_id)');
    }

    public function down(Schema $schema): void
    {
        // this down() migration is auto-generated, please modify it to your needs
        $this->addSql('CREATE SCHEMA public');
        $this->addSql('ALTER TABLE variable DROP CONSTRAINT FK_CC4D878D73B21E9C');
        $this->addSql('DROP INDEX IDX_CC4D878D73B21E9C');
        $this->addSql('ALTER TABLE variable DROP step_id');
    }
}
